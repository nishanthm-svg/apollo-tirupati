export const WHATSAPP_NUMBER = '917207074078';

export const buildWhatsAppBookingMessage = (test, centre = 'Tirupati') => {
  return encodeURIComponent(
    `Hi Apollo Diagnostics Tirupati! 🙏\n\n` +
    `I'd like to book the following test:\n` +
    `*Test:* ${test.name}\n` +
    `*Price:* ₹${test.price}\n` +
    `*Centre:* ${centre}\n\n` +
    `Please confirm availability.\n\nThank you!`
  );
};

export const buildWhatsAppPackageMessage = (pkg, centre = 'Tirupati') => {
  return encodeURIComponent(
    `Hi Apollo Diagnostics Tirupati! 🙏\n\n` +
    `I'd like to book the following health package:\n` +
    `*Package:* ${pkg.name}\n` +
    `*Price:* ₹${pkg.price}\n` +
    `*Includes:* ${Array.isArray(pkg.includes) ? pkg.includes.join(', ') : pkg.includes}\n` +
    `*Centre:* ${centre}\n\n` +
    `Please confirm availability.\n\nThank you!`
  );
};

export const buildWhatsAppGeneralMessage = () => {
  return encodeURIComponent(
    `Hi Apollo Diagnostics Tirupati! 🙏\n\nI'd like to know more about your lab tests and health packages. Please guide me.`
  );
};

export const buildWhatsAppHomeCollectionMessage = () => {
  return encodeURIComponent(
    `Hi Apollo Diagnostics Tirupati! 🙏\n\nI'd like to book a *Free Home Collection* for my lab tests.\n\nPlease let me know the process and available slots.\n\nThank you!`
  );
};

export const buildWhatsAppBookingConfirmMessage = (booking) => {
  return encodeURIComponent(
    `Hi Apollo Diagnostics Tirupati! 🙏\n\n` +
    `My booking is confirmed:\n` +
    `*Booking ID:* ${booking.id}\n` +
    `*Name:* ${booking.name}\n` +
    `*Test:* ${booking.test}\n` +
    `*Centre:* ${booking.centre}\n` +
    `*Date:* ${booking.date}\n` +
    `*Time:* ${booking.timeSlot}\n\n` +
    `Please confirm my appointment. Thank you!`
  );
};

export const openWhatsApp = (message) => {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
};
