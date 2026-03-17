export function validateSetOffDelay(payload: any) {
    return typeof payload?.room_id === 'number' &&
           typeof payload?.off_delay === 'number';
}