
const GoogleMap = () => {
  return (
    <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
      <iframe
        title="Landmark 81"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1076154062594!2d106.72009487480127!3d10.79416728936107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528c911ad5fd5%3A0xd6c6714bb7a57a3e!2sLandmark%2081!5e0!3m2!1svi!2s!4v1727101234567!5m2!1svi!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
