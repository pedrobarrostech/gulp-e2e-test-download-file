package main

import (
	"fmt"
	"io"
	"net"
	"net/http"
	"time"
)


func Index(w http.ResponseWriter, r *http.Request) {
	link := "<a href='/download' id='download-link'>Download file</a>"
	io.WriteString(w, link)

}

func DownloadFile(w http.ResponseWriter, r *http.Request) {
	url := "https://golang.org/doc/gopher/doc.png"

	timeout := time.Duration(5) * time.Second
	transport := &http.Transport{
		ResponseHeaderTimeout: timeout,
		Dial: func(network, addr string) (net.Conn, error) {
			return net.DialTimeout(network, addr, timeout)
		},
		DisableKeepAlives: true,
	}
	client := &http.Client{
		Transport: transport,
	}
	resp, err := client.Get(url)
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()

	//copy the relevant headers. If you want to preserve the downloaded file name, extract it with go's url parser.
	w.Header().Set("Content-Disposition", "attachment; filename=go.png")
	w.Header().Set("Content-Type", r.Header.Get("Content-Type"))
	w.Header().Set("Content-Length", r.Header.Get("Content-Length"))

	//stream the body to the client without fully loading it into memory
	io.Copy(w, resp.Body)
}

func main() {
	http.HandleFunc("/", Index)
	http.HandleFunc("/download", DownloadFile)
	err := http.ListenAndServe(":9999", nil)

	if err != nil {
		fmt.Println(err)
	}
}


