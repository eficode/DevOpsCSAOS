const generateAnswerData = (question_amount) => {
  const json_file = []
  const possible_values = [
    'Strongly disagree',
    'Disagree',
    'Do not disagree or agree',
    'Agree',
    'Strongly agree',
  ]
  let counter = 1
  for (let i = 0; i < question_amount; i += 1) {
    for (
      let j = 0;
      j < 5;
      j += 1 // 1=-2,
    ) {
      const point = j - 2
      const text_index = j
      const id = i
      const json_document = {
        id: counter,
        questionId: id + 1,
        text: possible_values[text_index],
        points: point,
      }
      counter += 1
      json_file.push(json_document)
    }
  }
  // console.log(json_file)
  return json_file
}
module.exports = { generateAnswerData }
