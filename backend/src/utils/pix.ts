import { encode, decode } from 'js-base64';

export const encodeKey = (userId: string, value: number, registerId: string) => {
    const userIdEncoded = encode(userId);
    const valueEncoded = encode(value.toString());
    const registerIdEncoded = encode(registerId);
    return `${userIdEncoded}-${valueEncoded}-${registerIdEncoded}`;
}

export const decodeKey = (key: string) => {
    const [ userIdEncoded, valueEncoded, registerIdEncoded ] = key.split('-');
    const userId = decode(userIdEncoded);
    const value = decode(valueEncoded);
    const registerId = decode(registerIdEncoded);
    return {
        userId,
        value,
        registerId,
    };
}