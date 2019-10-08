export const transValidation = {
  email_incorrect: "Email phải có dạng example@gmail.com!",
  password_incorrect: "Mật khẩu ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt!",
  password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác!",
  gender_incorrect: "Đừng làm như thế nhá người ae!"
};

export const transErrors = {
  account_in_use: "Email này đã được sử dụng.",
  account_removed: "Tài khoản này đã bị gỡ khỏi hệ thống, nếu tin điều này là hiểu nhầm, vui lòng liên hệ lại với chúng tôi tại hòm thư awesomechat@gmail.com.",
  account_not_active: "Email này đã được đăng ký nhưng chưa active tìa khoản, vui lòng kiểm tra email của bạn.",
  token_undefine: "Token không tồn tại",
  login_failed: "Tài khoản hoặc mật khẩu không chính xác",
  server_error: "Có lỗi xảy ra, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi, xin cảm ơn"
};

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để kích hoạt.`
  },
  account_actived: "Xác nhận thành công, giờ bạn có thể đăng nhập vào hệ thống",
  loginSuccess: (username) => {
    return `Xin chào ${username}`;
  }
};

export const transMail = {
  subject: "Awesome chat: Xác nhận kích hoạt tài khoản",
  template: (linkVerify) => {
    return `
    <h2>Xác nhận tài khoản </h2>
    <h3>Vui lòng click vào link bên dưới để xác nhận tài khoản của bạn. </h3>
    <h3> <a href="${linkVerify}" target="_blank">${linkVerify}</a> </h3>
    `
  },
  send_failed: "Có lỗi trong quá trình gửi email, vui lòng liên hệ lại với bộ phận hỗ trợ của chúng tôi."
};
