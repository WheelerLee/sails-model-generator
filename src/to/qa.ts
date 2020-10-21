import readline from 'readline';

const qa = function(query: string): Promise<string> {
  return new Promise(function(resolve) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(query, (answer: string) => {
      console.log(answer);
      resolve(answer);
      rl.close();
    });
  });
}

export default qa;
