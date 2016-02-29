// Auto-generated by avdl-compiler v1.0.3 (https://github.com/keybase/node-avdl-compiler)
//   Input file: avdl/common.avdl
//   Generated : Sun Feb 28 2016 22:03:20 GMT-0500 (EST)

package keybase1

import (
	rpc "github.com/keybase/go-framed-msgpack-rpc"
)

type Time int64
type StringKVPair struct {
	Key   string `codec:"key" json:"key"`
	Value string `codec:"value" json:"value"`
}

type Status struct {
	Code   int            `codec:"code" json:"code"`
	Name   string         `codec:"name" json:"name"`
	Desc   string         `codec:"desc" json:"desc"`
	Fields []StringKVPair `codec:"fields" json:"fields"`
}

type UID string
type DeviceID string
type SigID string
type KID string
type Text struct {
	Data   string `codec:"data" json:"data"`
	Markup bool   `codec:"markup" json:"markup"`
}

type PGPIdentity struct {
	Username string `codec:"username" json:"username"`
	Comment  string `codec:"comment" json:"comment"`
	Email    string `codec:"email" json:"email"`
}

type PublicKey struct {
	KID               KID           `codec:"KID" json:"KID"`
	PGPFingerprint    string        `codec:"PGPFingerprint" json:"PGPFingerprint"`
	PGPIdentities     []PGPIdentity `codec:"PGPIdentities" json:"PGPIdentities"`
	IsSibkey          bool          `codec:"isSibkey" json:"isSibkey"`
	IsEldest          bool          `codec:"isEldest" json:"isEldest"`
	ParentID          string        `codec:"parentID" json:"parentID"`
	DeviceID          DeviceID      `codec:"deviceID" json:"deviceID"`
	DeviceDescription string        `codec:"deviceDescription" json:"deviceDescription"`
	DeviceType        string        `codec:"deviceType" json:"deviceType"`
	CTime             Time          `codec:"cTime" json:"cTime"`
	ETime             Time          `codec:"eTime" json:"eTime"`
}

type User struct {
	Uid      UID    `codec:"uid" json:"uid"`
	Username string `codec:"username" json:"username"`
}

type Device struct {
	Type       string   `codec:"type" json:"type"`
	Name       string   `codec:"name" json:"name"`
	DeviceID   DeviceID `codec:"deviceID" json:"deviceID"`
	CTime      Time     `codec:"cTime" json:"cTime"`
	MTime      Time     `codec:"mTime" json:"mTime"`
	EncryptKey KID      `codec:"encryptKey" json:"encryptKey"`
	VerifyKey  KID      `codec:"verifyKey" json:"verifyKey"`
	Status     int      `codec:"status" json:"status"`
}

type Stream struct {
	Fd int `codec:"fd" json:"fd"`
}

type LogLevel int

const (
	LogLevel_NONE     LogLevel = 0
	LogLevel_DEBUG    LogLevel = 1
	LogLevel_INFO     LogLevel = 2
	LogLevel_NOTICE   LogLevel = 3
	LogLevel_WARN     LogLevel = 4
	LogLevel_ERROR    LogLevel = 5
	LogLevel_CRITICAL LogLevel = 6
	LogLevel_FATAL    LogLevel = 7
)

type ClientType int

const (
	ClientType_NONE ClientType = 0
	ClientType_CLI  ClientType = 1
	ClientType_GUI  ClientType = 2
	ClientType_KBFS ClientType = 3
)

type UserVersionVector struct {
	Id               int64 `codec:"id" json:"id"`
	SigHints         int   `codec:"sigHints" json:"sigHints"`
	SigChain         int64 `codec:"sigChain" json:"sigChain"`
	CachedAt         Time  `codec:"cachedAt" json:"cachedAt"`
	LastIdentifiedAt Time  `codec:"lastIdentifiedAt" json:"lastIdentifiedAt"`
}

type UserPlusKeys struct {
	Uid        UID               `codec:"uid" json:"uid"`
	Username   string            `codec:"username" json:"username"`
	DeviceKeys []PublicKey       `codec:"deviceKeys" json:"deviceKeys"`
	Keys       []PublicKey       `codec:"keys" json:"keys"`
	Uvv        UserVersionVector `codec:"uvv" json:"uvv"`
}

type MerkleTreeID int

const (
	MerkleTreeID_MASTER       MerkleTreeID = 0
	MerkleTreeID_KBFS_PUBLIC  MerkleTreeID = 1
	MerkleTreeID_KBFS_PRIVATE MerkleTreeID = 2
)

type CommonInterface interface {
}

func CommonProtocol(i CommonInterface) rpc.Protocol {
	return rpc.Protocol{
		Name:    "keybase.1.Common",
		Methods: map[string]rpc.ServeHandlerDescription{},
	}
}

type CommonClient struct {
	Cli rpc.GenericClient
}
