module.exports = {
  calculateAge: () => {
    const birthDate = new Date(process.env.BIRTHDATE);
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    let hours = now.getHours() - birthDate.getHours();

    const reachedHour = now.getMinutes() >= birthDate.getMinutes();
    const reachedDay = !(
      now.getHours() < birthDate.getHours() ||
      (now.getHours() === birthDate.getHours() && !reachedHour)
    );
    const reachedMonth = !(
      now.getDate() < birthDate.getDate() ||
      (now.getDate() === birthDate.getDate() && !reachedDay)
    );
    const reachedYear = !(
      now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() && !reachedMonth)
    );

    if (!reachedYear) {
      years--;
    }

    if (!reachedMonth) {
      months--;
    }

    if (!reachedDay) {
      days--;
    }

    if (!reachedHour) {
      hours--;
    }

    if (hours < 0) {
      hours += 24;
    }

    if (days < 0) {
      const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      months += 12;
    }

    return { years, months, days, hours };
  },
};
