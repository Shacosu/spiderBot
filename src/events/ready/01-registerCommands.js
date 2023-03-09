const areCommandDifferent = require("../../utils/areCommandDifferent");
const getLocalsCommands = require("../../utils/getLocalsCommands");
const getApplicationCommands = require("../../utils/getApplicationCommands");

require("dotenv").config();

module.exports = async (client) => {
	try {
		const localCommands = getLocalsCommands();
		const applicationCommands = await getApplicationCommands(
			client,
			process.env.GUILD_ID
		);
		for (const localCommand of localCommands) {
			const { name, description, options } = localCommand;
			const existingCommand = await applicationCommands.cache.find(
				(cmd) => cmd.name === name
			);
			if (existingCommand) {
				if (localCommand.deleted) {
					await applicationCommands.delete(existingCommand.id);
					console.log(`Comando eliminado => ${name}`);
                    break;
				}
                if (areCommandDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options
                    });
                    console.log(`Comando editado => ${name}`);
                }
			} else {
                if (localCommand.deleted) {
                    console.log(`El comando ha sido "${name}" seteado para ser eliminado`);
                    continue;
                }
                console.log(name, description, options);
                const res = await applicationCommands.create( {name, description, options} );
                console.log(res);
                console.log(`El comando ${name} ha sido registrado`);
            }
		}
	} catch (error) {
		console.log(error);
	}
};
