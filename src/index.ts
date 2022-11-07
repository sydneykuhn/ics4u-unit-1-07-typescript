/*
 * This program uses the bell curve to generate marks.
 *
 * @author  Sydney Kuhn
 * @version 1.0
 * @since   2022-11-07
 */

// Imports
import { writeFileSync, readFileSync } from 'fs'

// Setup the Bell Curve and Standard Deviation
function generateGaussian(mean: number, std: number) {
  // https://discourse.psychopy.org/t/javascript-gaussian-function/17724/2
  const _2PI = Math.PI * 2
  const u1 = Math.random()
  const u2 = Math.random()

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(_2PI * u2)

  return z0 * std + mean
}

// Creates a Table Using Arrays
function makeArray(d1: number, d2: number) {
  // https://stackoverflow.com/questions/13808325/creating-a-2d-array-with-specific-length-and-width
  const arr = []
  for (let i = 0; i < d2; i++) {
    arr.push(new Array(d1))
  }
  return arr
}

// Function That Generates Marks
function markGenerator(assignmentsArray: string[], studentsArray: string[]) {
  // Defining array
  const arr: string[][] = makeArray(
    studentsArray.length + 1,
    arrayOfAssignments.length
  )

  // Adding student names
  arr[0] = arrayOfStudents
  arr[0].unshift('')

  // Adding assignments and grades
  for (let y = 1; y <= assignmentsArray.length - 1; y++) {
    arr[y][0] = arrayOfAssignments[y]
    for (let x = 1; x <= studentsArray.length - 1; x++) {
      arr[y][x] = Math.round(generateGaussian(75, 10)).toString()
    }
  }

  // Return Array
  return arr
}

// Read files
const studentsFile = readFileSync('./files/students.txt', 'utf-8')
const assignmentsFile = readFileSync('./files/assignments.txt', 'utf-8')

// Convert files to arr
const arrayOfStudents = studentsFile
  .toString()
  .replace(/\r\n/g, '\n')
  .split('\n')
arrayOfStudents.pop()
const arrayOfAssignments = assignmentsFile
  .toString()
  .replace(/\r\n/g, '\n')
  .split('\n')
arrayOfAssignments.pop()

// Process
const returned: string[][] = markGenerator(arrayOfAssignments, arrayOfStudents)

// Export string
let exportString: string = ''

for (let y = 0; y < returned.length; y++) {
  for (let x = 0; x < returned[0].length; x++) {
    exportString += returned[y][x]
    exportString += ','
  }
  exportString += '\n'
}

// Export File
writeFileSync('table.csv', exportString)
