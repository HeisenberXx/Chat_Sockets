let ChatHistory = new Map();

export function saveMessage(id, to, message) {
    const keyExists = hasKeyPartially(ChatHistory, id, to);
    if ( keyExists !== false ) {
        ChatHistory.get(keyExists).push({message, id});
    }else{
        ChatHistory.set(`${id}_$${to}`,[{message, id}]);
    }
} 

export function getMessages(id, to) {
    const keyExists = hasKeyPartially(ChatHistory, id, to);
    if ( keyExists !== false ) {
        return ChatHistory.get(keyExists);
    }else{
        return [];
    }
}

function hasKeyPartially(map, partialKey, to) {
    for (let key of map.keys()) {
        if (key.includes(partialKey) && key.includes(to)) {
            return key;
        }
    }
    return false;
}