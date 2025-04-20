module.exports = {
  calculateAge: () => {
    const birthDate = new Date(process.env.BIRTHDATE);
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    let hours = now.getHours() - birthDate.getHours();

    if (
      now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() &&
        now.getDate() < birthDate.getDate())
    ) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += previousMonth.getDate();
      months--;
    }

    if (hours < 0) {
      hours += 24;
      days--;
      if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
      }
    }

    return { years, months, days, hours };
  },
};
