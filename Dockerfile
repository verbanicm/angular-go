FROM --platform=$BUILDPLATFORM node:16 AS node-builder

WORKDIR /app
COPY . .

RUN npm install --prefix ./ui

ENV NODE_ENV=production
RUN npm run build --prefix ./ui

FROM --platform=$BUILDPLATFORM golang:1.19 AS go-builder

ENV PORT=8080
ENV CGO_ENABLED=0
ENV GOPROXY=https://proxy.golang.org,direct

WORKDIR /go/src/app
COPY . .
COPY --from=node-builder /app/ui/dist ./ui/dist

RUN go build \
    -a \
    -trimpath \
    -ldflags "-s -w -extldflags='-static'" \
    -o /go/bin/server \
    ./cmd/server

RUN strip -s /go/bin/server

RUN echo "nobody:*:65534:65534:nobody:/:/bin/false" > /tmp/etc-passwd

# Use a scratch image to host our binary.
FROM scratch
COPY --from=go-builder /tmp/etc-passwd /etc/passwd
COPY --from=go-builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=go-builder /go/bin/server /server

USER nobody

EXPOSE 8080
ENTRYPOINT ["/server"]
