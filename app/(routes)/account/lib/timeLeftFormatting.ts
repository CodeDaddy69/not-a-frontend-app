export default function formatTimeLeft(timeToAction: number) {
    const asInt = new Date(timeToAction).getTime()
    const timeLeftMinutes = (asInt - Date.now()) / (1000 * 60)
    return ( timeLeftMinutes > 0 ) ? 
    {days: Math.floor(timeLeftMinutes/(60 * 24)) , hours: Math.floor(timeLeftMinutes/60) % 24, minutes: Math.floor(timeLeftMinutes) % 60} :
    undefined
}