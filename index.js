// reference: https://www.npmjs.com/package/dotenv

const fs = require('node:fs')

function config (options = {}) {
  const path = options.path || '.env'
  const fileExist = fs.existsSync(path)

  if (fileExist) {
    const envLines = fs.readFileSync(path, 'utf-8')

    envLines.split('\n').forEach(line => {
      const [key, value] = line.split('=')

      process.env[key] = value.replaceAll('"', '')
    })
  }
}

//Me tomó bastante tiempo y dolores de cabeza devolver el número de puerto como cadena.

module.exports = { config }

// Q: Aunque muchas veces recomendamos usar métodos asíncronos para leer ficheros, en este caso seguramente no sea la opción. ¿Te imaginas por qué?
/* A: Si la carga del fichero se realiza de forma asíncrona, no podemos determinar en que momento estará disponible para realizar la configuración.
Los valores deben existir cuando son requeridos */
