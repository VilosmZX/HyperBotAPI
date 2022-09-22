export async function extractCountryCode(number: string) {
    return number.substring(0, 2);
}