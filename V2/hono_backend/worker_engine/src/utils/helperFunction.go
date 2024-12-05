package utils

import (
	"encoding/json"
	"worker_engine/src/controllers"
	"worker_engine/src/model"
)

func ParseQueueMessage(message string) (model.MessageFromQueue, error) {

	var parseOrder model.MessageFromQueue

	err := json.Unmarshal([]byte(message), &parseOrder)
	if err != nil {
		return model.MessageFromQueue{}, err
	}
	return parseOrder, nil
}

func StringifyPubSubMessage(message model.MessageToPubSub) (string, error) {
	stringifiedMessage, err := json.Marshal(message)
	if err != nil {
		return "", err
	}
	return string(stringifiedMessage), nil
}

func Redirection(message model.MessageFromQueue) (info model.MessageToPubSub) {
	processedMessage, err := controllers.ProcessRequest(message)
	if err != nil {
		return model.MessageToPubSub{
			Type:       message.Type,
			StatusCode: 400,
			Payload:    nil,
		}
	}
	return processedMessage
}
