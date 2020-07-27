import React from "react";
import { Avatar, Popover, Modal, Button, message } from "antd";
import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  MobileOutlined,
  UnlockOutlined,
  UserOutlined,
  CaretDownOutlined
} from "@ant-design/icons";
import userImg from "@/assets/user-img.png";
import { withRouter } from "react-router-dom";
import MobileLogin from "@/pages/login/components/mobileLogin";
import { connect } from "react-redux";
const MainAvatar = (props: objectKey) => {
  const { history, userInfo } = props;
  const [visible, setVisible] = React.useState<boolean>(false);
  let formValue: objectKey = {};
  // 退出登录
  function loginOut() {
    Modal.confirm({
      title: "是否退出登录?",
      onOk() {
        history.replace("/admin/login");
      }
    });
  }

  const popoverContent = (
    <ul className=" text-center col-9">
      <li className="col-3 pt-5 pb-10 mb-10 bb-e fs-16 font-weight">
        {userInfo.loginName}
      </li>
      {/* <li className="col-9 fs-12 pb-5 mb-10 bb-e">{userInfo.mobile}</li> */}
      <li className="mb-5">
        <Link to="/" className="col-9">
          <UserOutlined /> 修改头像
        </Link>
      </li>
      <li className="mb-5 col-9 pointer" onClick={() => setVisible(true)}>
        <MobileOutlined /> 改绑手机
      </li>
      <li className="mb-10 pb-5 bb-e">
        <Link to="/" className="col-9">
          <UnlockOutlined /> 修改密码
        </Link>
      </li>
      <li className="col-9 pointer" onClick={loginOut}>
        <LogoutOutlined /> 退出登录
      </li>
    </ul>
  );
  // 修改手机号表单改变
  const onMobileChange = (_formValue: objectKey) => {
    formValue = _formValue;
  };
  // 提交修改手机号
  const toSaveMobile = () => {
    if (!formValue.mobile || !formValue.code) {
      return message.error("手机号与验证码不能为空");
    }
    Modal.confirm({
      title: "是否更换手机号?",
      onOk() {
        message.success("修改成功");
        setVisible(false);
      }
    });
  };
  return (
    <>
      <Popover
        content={popoverContent}
        placement="bottomRight"
        trigger="hover"
        overlayClassName="main-avatar-popover"
      >
        <div>
          <Avatar size={32} src={userImg} />
          <CaretDownOutlined className="col-9 ml-5" />
        </div>
      </Popover>

      <Modal
        visible={visible}
        footer={null}
        width={400}
        title="绑定新手机号"
        onCancel={() => setVisible(false)}
      >
        <MobileLogin onChange={onMobileChange} />
        <div className="text-center  mb-20">
          <a
            href="javascript:;"
            className="table-button close-button  pl-50 pr-50 pt-8 pb-8 dis-inb"
            onClick={() => setVisible(false)}
          >
            取消
          </a>
          <Button
            type="primary"
            className="table-button pl-50 pr-50 pt-8 pb-8 ml-20"
            onClick={toSaveMobile}
          >
            确定
          </Button>
        </div>
      </Modal>
    </>
  );
};
function mapStateToProps(state: objectKey) {
  return {
    userInfo: state.reducerUser.userInfo || {}
  };
}
export default connect(mapStateToProps)(withRouter(MainAvatar));
