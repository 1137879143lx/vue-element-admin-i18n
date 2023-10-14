const { exec } = require('child_process')

function callPythonScript(filePath, density) {
  const command = `python python读取stp文件-js调用.py "${filePath}" ${density}`
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`Result from Python Script:\n${stdout}`)
  })
}

// Example usage
const filePath = 'C:\\Users\\Administrator\\Desktop\\_model106.stp'
const densityValue = 7.85 // You can adjust this value or get it from user input
callPythonScript(filePath, densityValue)
