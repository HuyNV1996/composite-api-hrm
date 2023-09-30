export function convertTimestampToFormattedDate(timestamp_ms:number) {
    const timestamp_seconds = timestamp_ms / 1000;
    const dateObject = new Date(timestamp_seconds * 1000);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  }