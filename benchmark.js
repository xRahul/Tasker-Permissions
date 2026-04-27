const start = performance.now();
const testScriptFiles = Array.from({length: 10}).map((_, i) => 'test_' + i + '.js');

class UtilDOM {
    static async addScriptFile(scriptFile){
        return new Promise(resolve => setTimeout(resolve, 10)); // fake delay simulating an async operation
    }

    // Original implementation
    static async addScriptFilesSequential(...scriptFiles){
        for(const scriptFile of scriptFiles){
            await UtilDOM.addScriptFile(scriptFile);
        }
    }

    // New optimized implementation
    static async addScriptFilesParallel(...scriptFiles){
        await Promise.all(scriptFiles.map(scriptFile => UtilDOM.addScriptFile(scriptFile)));
    }
}

async function runBenchmark() {
    console.log("Running benchmark...");

    // Test Sequential
    const startSeq = performance.now();
    await UtilDOM.addScriptFilesSequential(...testScriptFiles);
    const endSeq = performance.now();
    const timeSeq = endSeq - startSeq;
    console.log(`Sequential time: ${timeSeq.toFixed(2)}ms`);

    // Test Parallel
    const startPar = performance.now();
    await UtilDOM.addScriptFilesParallel(...testScriptFiles);
    const endPar = performance.now();
    const timePar = endPar - startPar;
    console.log(`Parallel time: ${timePar.toFixed(2)}ms`);

    // Improvement
    const improvement = timeSeq - timePar;
    const percentImprovement = ((improvement / timeSeq) * 100).toFixed(2);
    console.log(`\nImprovement: ${improvement.toFixed(2)}ms (${percentImprovement}% faster)`);
}

runBenchmark();
