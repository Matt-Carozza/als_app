import { execSync, spawn } from "child_process";

function run(cmd: string, args: string[], cwd: string) {
    const p = spawn(cmd, args, {
        cwd,
        stdio: "inherit",
        shell: true,
    });

    p.on("exit", code => {
        if (code !== 0) {
            console.error(`${cmd} exited with code ${code}`);
            process.exit(code ?? 1);
        }
    });
    
    return p;
}

try {
    execSync("adb get-state", {stdio: "ignore"});
} catch {
    console.error("adb not available or no device connected");
    process.exit(1);
}

console.log("Setting up port forwarding...");
execSync("adb reverse tcp:3000 tcp:3000", {stdio: "inherit"});

console.log("Starting server...");
run("npm", ["run", "dev:public"], "./server");

console.log("Starting Android app...")
run("npm", ["run", "dev:android"], "./mobile");

process.on("exit", () => {
    try {
        execSync("adb reverse --remove tcp:3000");
    } catch {
        console.error("Unable to forwarding port 3000 from android device");
    }
})