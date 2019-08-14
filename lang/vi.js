export const transValidation = {
  email_incorrect: "Email phải có dạng example@gmail.com!",
  password_incorrect: "Mật khẩu ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt!",
  password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác!",
  gender_incorrect: "Đừng làm như thế nhá người ae!"
};

export const transErrors = {
  account_in_use: "Email này đã được sử dụng.",
  account_removed: "Tài khoản này đã bị gỡ khỏi hệ thống, nếu tin điều này là hiểu nhầm, vui lòng liên hệ lại với chúng tôi tại hòm thư awesomechat@gmail.com.",
  account_not_active: "Email này đã được đăng ký nhưng chưa active tìa khoản, vui lòng kiểm tra email của bạn."
};

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để kích hoạt.`
  }
};
