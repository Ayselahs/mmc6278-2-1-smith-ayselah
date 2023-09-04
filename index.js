const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    // TODO: Pull a random quote from the quotes.txt file
    // console log the quote and author
    // You may style the text with chalk as you wish
    try {
      const data = await fs.readFile(QUOTE_FILE, 'utf-8') 
        
      const quotes = data.split("\n")
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].split('|')
      const [quote, author] = randomQuote.map((str) => str.trim())

    
      console.log(chalk.blue(quote))
      console.log(chalk.green(author || "Anonymous"))
      
    } catch (err) {
      console.log(chalk.red(err))
    }
  })

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    // TODO: Add the quote and author to the quotes.txt file
    // If no author is provided,
    // save the author as "Anonymous".
    // After the quote/author is saved,
    // alert the user that the quote was added.
    // You may style the text with chalk as you wish
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving
    const QUOTE = `${quote} | ${author || "Anonymous"}`
    try {
      await fs.appendFile(QUOTE_FILE, QUOTE)
      
      .then (async () => {
        const data = await fs.readFile(QUOTE_FILE, 'utf-8')
      })
      console.log(chalk.bgMagenta("Quote added!"))
    } catch (err) {
      console.log(chalk.red(err))
    }

    
  });

program.parse();
