// Auto-generated by avdl-compiler v1.0.3 (https://github.com/keybase/node-avdl-compiler)
//   Input file: avdl/process.avdl
//   Generated : Sun Feb 28 2016 22:03:20 GMT-0500 (EST)

package keybase1

import (
	rpc "github.com/keybase/go-framed-msgpack-rpc"
)

type FileType int

const (
	FileType_UNKNOWN   FileType = 0
	FileType_DIRECTORY FileType = 1
	FileType_FILE      FileType = 2
)

type FileDescriptor struct {
	Name string   `codec:"name" json:"name"`
	Type FileType `codec:"type" json:"type"`
}

type Process struct {
	Pid             string           `codec:"pid" json:"pid"`
	Command         string           `codec:"command" json:"command"`
	FileDescriptors []FileDescriptor `codec:"fileDescriptors" json:"fileDescriptors"`
}

type ProcessInterface interface {
}

func ProcessProtocol(i ProcessInterface) rpc.Protocol {
	return rpc.Protocol{
		Name:    "keybase.1.process",
		Methods: map[string]rpc.ServeHandlerDescription{},
	}
}

type ProcessClient struct {
	Cli rpc.GenericClient
}
