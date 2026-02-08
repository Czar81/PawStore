import icon from '../../assets/icons/emoji-sad.svg';

function NotFound({ title, desc }) {
  return (
    <>
      <img className="emoji" src={icon} alt="Sad emoji" />
      <p className="title">{title}</p>
      <p className="desc">{desc}</p>
    </>
  );
}

export default NotFound;
