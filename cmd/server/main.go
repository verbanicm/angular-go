// Copyright 2023 The Authors (see AUTHORS file)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Package main is the main entrypoint to the application.
package main

import (
	"fmt"
	"io/fs"
	"log"
	"net/http"

	"github.com/verbanicm/angular-go/ui"
)

// This is not a production server and should only be used for testing
func main() {
	u, err := fs.Sub(ui.UI, "dist/ui")
	if err != nil {
		panic(err)
	}

	mutex := http.NewServeMux()
	mutex.Handle("/", http.FileServer(http.FS(u)))
	mutex.Handle("/api/data", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, `{"data":"Hello!"}`)
	}))

	if err = http.ListenAndServe(":8080", mutex); err != nil {
		log.Fatal(err)
	}
}
