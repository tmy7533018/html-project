function toggleInputWithAnimation(optionId, inputId) {
    const optionValue = document.getElementById(optionId).value;
    const inputField = document.getElementById(inputId);
    inputField.style.display = optionValue === 'yes' ? 'block' : 'none';
    if (optionValue === 'no') {
        inputField.value = '';
    }
}

function toggleOvertimeInputsWithAnimation() {
    const optionValue = document.getElementById('overtimeOption').value;
    const overtimeInputs = document.getElementById('overtimeInputs');
    overtimeInputs.style.display = optionValue === 'yes' ? 'block' : 'none';
    if (optionValue === 'no') {
        document.getElementById('regularOvertime').value = '';
        document.getElementById('extraOvertime').value = '';
    }
}

function validateAndCalculate() {
    const workingDays = document.getElementById('workingDays');
    const regularOvertime = document.getElementById('regularOvertime');
    const extraOvertime = document.getElementById('extraOvertime');
    const transportation = document.getElementById('transportation');

    let isValid = true;

    if (workingDays.value === '' || workingDays.value <= 0) {
        document.getElementById('error-workingDays').innerText = '正しい出勤日数を入力してください。';
        isValid = false;
    } else {
        document.getElementById('error-workingDays').innerText = '';
    }

    if (document.getElementById('overtimeOption').value === 'yes') {
        if (regularOvertime.value === '' || regularOvertime.value < 0) {
            document.getElementById('error-overtime').innerText = '正しい法内残業時間を入力してください。';
            isValid = false;
        } else if (extraOvertime.value === '' || extraOvertime.value < 0) {
            document.getElementById('error-overtime').innerText = '正しい法外残業時間を入力してください。';
            isValid = false;
        } else {
            document.getElementById('error-overtime').innerText = '';
        }
    } else {
        document.getElementById('error-overtime').innerText = '';
    }

    if (document.getElementById('transportationOption').value === 'yes' && (transportation.value === '' || transportation.value < 0)) {
        document.getElementById('error-transportation').innerText = '正しい交通費を入力してください。';
        isValid = false;
    } else {
        document.getElementById('error-transportation').innerText = '';
    }

    if (isValid) {
        calculateSalary();
    }
}

function calculateSalary() {
    const workingDays = Number(document.getElementById('workingDays').value);
    const regularOvertime = Number(document.getElementById('regularOvertime').value) || 0;
    const extraOvertime = Number(document.getElementById('extraOvertime').value) || 0;
    const transportationPerDay = Number(document.getElementById('transportation').value) || 0;

    const hourlyWage = 1100; // 時給
    const workHoursPerDay = 7.5; // 1日の労働時間
    const dailyWage = hourlyWage * workHoursPerDay;
    const regularOvertimeRate = 1.25;
    const extraOvertimeRate = 1.5;

    const baseSalary = workingDays * dailyWage;
    const regularOvertimePay = regularOvertime * hourlyWage * regularOvertimeRate;
    const extraOvertimePay = extraOvertime * hourlyWage * extraOvertimeRate;
    const transportation = transportationPerDay * workingDays;

    const grossPay = baseSalary + regularOvertimePay + extraOvertimePay + transportation;

    const incomeTax = grossPay * 0.1; // 所得税 10%
    const healthInsurance = grossPay * 0.08; // 健康保険 8%
    const employmentInsurance = grossPay * 0.005; // 雇用保険 0.5%
    const totalDeductions = incomeTax + healthInsurance + employmentInsurance;

    const taxableIncome = grossPay - totalDeductions;
    const netPay = grossPay - totalDeductions;

    const resultDiv = document.getElementById('result');
    resultDiv.style.animation = "growFade 0.5s ease-in-out";
    resultDiv.innerHTML = `
        <div><span>所定内給与:</span><span>¥${baseSalary.toFixed(2)}</span></div>
        <div><span>残業代（法内残業）:</span><span>¥${regularOvertimePay.toFixed(2)}</span></div>
        <div><span>残業代（法外残業）:</span><span>¥${extraOvertimePay.toFixed(2)}</span></div>
        <div><span>交通費:</span><span>¥${transportation.toFixed(2)}</span></div>
        <div><span>総支給額:</span><span>¥${grossPay.toFixed(2)}</span></div>
        <div><span>所得税:</span><span>¥${incomeTax.toFixed(2)}</span></div>
        <div><span>健康保険:</span><span>¥${healthInsurance.toFixed(2)}</span></div>
        <div><span>雇用保険:</span><span>¥${employmentInsurance.toFixed(2)}</span></div>
        <div><span>控除合計:</span><span>¥${totalDeductions.toFixed(2)}</span></div>
        <div><span>課税対象額:</span><span>¥${taxableIncome.toFixed(2)}</span></div>
        <div><span>差引支給額:</span><span>¥${netPay.toFixed(2)}</span></div>
    `;
}