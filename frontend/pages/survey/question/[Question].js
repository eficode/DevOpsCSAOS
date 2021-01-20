import { useRouter } from 'next/router';

const Question = () => {
  const router = useRouter();
  console.log('💩 ~ file: [Question].js ~ line 5 ~ router', router);
  return <section>[Insert great survey question...]</section>;
};

export default Question;
