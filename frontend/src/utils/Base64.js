export function getBase64FromFile(file) {
  return new Promise((resolve, reject) => {
    //resolve는 정상 처리시, reject는 에러 상황시 호출
    const reader = new FileReader(); //파일을 읽어내고 load를 해주는 개념의 코드이다.
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
