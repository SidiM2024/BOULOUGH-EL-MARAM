// تأثير التمرير التلقائي بين التقييمات
let currentIndex = 0;
const reviews = document.querySelectorAll('.review');
const totalReviews = reviews.length;

function showNextReview() {
    reviews[currentIndex].style.display = 'none';  // إخفاء التقييم الحالي
    currentIndex = (currentIndex + 1) % totalReviews;  // الانتقال للتقييم التالي
    reviews[currentIndex].style.display = 'block';  // عرض التقييم التالي
}

setInterval(showNextReview, 5000); // التبديل بين التقييمات كل 5 ثواني

// إضافة التقييمات من النموذج إلى قسم التقييمات
const reviewForm = document.getElementById('review-form');

reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();  // منع الإرسال الفوري للنموذج

    const textarea = reviewForm.querySelector('textarea');
    const name = reviewForm.querySelector('input[type="text"]').value;
    const role = reviewForm.querySelector('select').value;

    if (textarea.value.trim() !== '') {
        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerHTML = `
            <p class="review-text">${textarea.value}</p>
            <h4 class="reviewer-name">${name}</h4>
            <p class="reviewer-role">${role === 'student' ? 'طالب' : 'ولي أمر'}</p>
        `;
        document.querySelector('.reviews-slider').appendChild(newReview);
        textarea.value = ''; // مسح النص بعد الإرسال
        name = ''; // مسح الاسم بعد الإرسال
        reviewForm.querySelector('input[type="text"]').value = '';
    }
});


// التحقق من صحة النموذج عند الإرسال
document.querySelector('.admission-form').addEventListener('submit', function(event) {
    event.preventDefault();  // منع إرسال النموذج حتى يتم التحقق من البيانات
    
    // استرجاع القيم المدخلة
    let fullName = document.querySelector('#full-name').value.trim();
    let birthDate = document.querySelector('#birth-date').value.trim();
    let grade = document.querySelector('#grade').value;
    let parentName = document.querySelector('#parent-name').value.trim();
    let phoneNumber = document.querySelector('#phone-number').value.trim();
    let email = document.querySelector('#email').value.trim();
    let address = document.querySelector('#address').value.trim();
    let message = document.querySelector('#message').value.trim();
    
    // متغير لحفظ حالة التحقق
    let valid = true;
    
    // إزالة الرسائل الخطأ السابقة
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(msg) {
        msg.remove();
    });

    // التحقق من الحقول
    if (fullName === '') {
        showError('full-name', 'الاسم الكامل مطلوب');
        valid = false;
    }

    if (birthDate === '') {
        showError('birth-date', 'تاريخ الميلاد مطلوب');
        valid = false;
    }

    if (grade === '') {
        showError('grade', 'الصف الدراسي مطلوب');
        valid = false;
    }

    if (parentName === '') {
        showError('parent-name', 'اسم ولي الأمر مطلوب');
        valid = false;
    }

    if (phoneNumber === '') {
        showError('phone-number', 'رقم الهاتف مطلوب');
        valid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
        showError('phone-number', 'رقم الهاتف غير صحيح');
        valid = false;
    }

    if (email === '') {
        showError('email', 'البريد الإلكتروني مطلوب');
        valid = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        showError('email', 'البريد الإلكتروني غير صحيح');
        valid = false;
    }

    if (address === '') {
        showError('address', 'عنوان السكن مطلوب');
        valid = false;
    }

    if (message === '') {
        showError('message', 'الرسالة أو الاستفسار مطلوب');
        valid = false;
    }

    // إذا كانت البيانات صحيحة، يمكن إرسال النموذج
    if (valid) {
        alert('تم تقديم النموذج بنجاح!');
        // في حالة الاختبار الفعلي، يمكن إرسال النموذج هنا:
        // event.target.submit();
    }
});

// عرض رسائل الخطأ
function showError(fieldId, message) {
    let field = document.querySelector(`#${fieldId}`);
    let errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    field.parentElement.appendChild(errorMessage);
}
