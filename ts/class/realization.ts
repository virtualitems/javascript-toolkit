interface IRunnable {
    run(): void;
}

class Runnable implements IRunnable {
    run() {
        console.log('Running...');
    }
}

const runnable = new Runnable();
runnable.run();
