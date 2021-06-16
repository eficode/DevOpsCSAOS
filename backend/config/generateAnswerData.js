const generateAnswerData = () => {
  let json_file = []
  let possible_values = [
    'Strongly Disagree',
    'Disagree',
    'I do not know',
    'Agree',
    'Strongly Agree',
  ]
  counter = 1
  for (i = 0; i < 17; i++) {
    for (
      j = 0;
      j < 5;
      j++ // 1=-2,
    ) {
      let point = j - 2
      let text_index = j
      let id = i
      json_document = {
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
