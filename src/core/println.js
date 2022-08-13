export default function println(...args) {

    // clear previous output and print new output

    process.stdout.write('\x1B[2J\x1B[0f');
    console.log('[PROJECT MANAGER]', ...args);


}