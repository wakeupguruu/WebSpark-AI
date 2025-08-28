export function stripIndents(value: string): string {
    return value.replace(/^[ \t]+/gm, '');
}
