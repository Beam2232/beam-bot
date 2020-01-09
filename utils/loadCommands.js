const fs = require('fs')
const chalk = require('chalk')

const ALL = (client) => {

    fs.readdir('./src/comandos', (err, files) => {
        if (err) console.error(err)

        // console.log(files)

        let arquivojs = files.filter(f => f.split('.').pop() == 'js')

        if (arquivojs.length <= 0) {
            console.log(chalk.red('[!] Não consegui encontrar quaisquer comando no módulo de comandos gerais.'));
            return
        };

        arquivojs.forEach((f, i) => {
            let props = require(`./../src/comandos/${f}`);
            console.log(chalk.yellow(`[!] (ALL) - Comando ${f} carregado com sucesso!`))
            client.commands.set(props.help.name, props);
        });

    });
}

module.exports = {
    ALL
}

