window.onload = function () {
	document.querySelector('#std_btn').addEventListener('click', studentButton);
	document.querySelector('#tch_btn').addEventListener('click', teacherButton);
}

function studentButton() {
  swal.withForm({
    title: 'Cool Swal-Forms example',
    text: 'Any text that you consider useful for the form',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Get form data!',
    closeOnConfirm: true,
    formFields: [
      { id: 'name', placeholder: 'Name Field' },
      { id: 'nickname', placeholder: 'Add a cool nickname' }
    ]
  }, function (isConfirm) {
    // do whatever you want with the form data
    console.log(this.swalForm) // { name: 'user name', nickname: 'what the user sends' }
  })
}

function teacherButton() {
  swal.withForm({
    title: 'Cool Swal-Forms example',
    text: 'Any text that you consider useful for the form',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Get form data!',
    closeOnConfirm: true,
    formFields: [
      { id: 'name', placeholder: 'Name Field' },
      { id: 'nickname', placeholder: 'Add a cool nickname' }
    ]
  }, function (isConfirm) {
    // do whatever you want with the form data
    console.log(this.swalForm) // { name: 'user name', nickname: 'what the user sends' }
  })
}
}