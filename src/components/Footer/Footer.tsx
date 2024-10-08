import runningCat from '../../img/footer.gif'

export const Footer = () => {
  return (

      <footer className="fixed bottom-0 right-0 h-24 w-24 animate-catRun z-50">
        <img
          src={runningCat}
          alt="Running Cat"
          className="h-full w-auto"
        />
      </footer>

  );
};
