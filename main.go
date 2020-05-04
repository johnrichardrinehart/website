package main

import (
  "log"
  "net/http"
)

func main() {
  fs := http.FileServer(http.Dir("./public"))
  http.Handle("/", fs)

  log.Println("Listening on :1313...")
  err := http.ListenAndServe(":1313", nil)
  if err != nil {
    log.Fatal(err)
  }
}
