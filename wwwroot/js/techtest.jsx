//main component
class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", phone: "", email: "", tname: true, tphone: true, temail: true, tvcode: true, butenable: true,
            vcodeinput: ""//The Vcode entered by user
        };
        this.handleFullName1 = this.handleFullName1.bind(this);
        this.handlePhone1 = this.handlePhone1.bind(this);
        this.handleEmail1 = this.handleEmail1.bind(this);
        this.handleInputVcode1 = this.handleInputVcode1.bind(this);
        this.handleSendVCode1 = this.handleSendVCode1.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
    }
    handleFullName1 = e => {
        if (e.length >= 1) { this.setState({ tname: true }) }
        else { this.setState({ tname: false }) }
        this.setState({ name: e });
    };
    handlePhone1 = e => {
        if (PhoneCheck(e)) { this.setState({ tphone: true }) }
        else { this.setState({ tphone: false }) }
        this.setState({ phone: e });
    };
    handleEmail1 = e => {
        if (EmailCheck(e)) { this.setState({ temail: true }) }
        else { this.setState({ temail: false }) }
        this.setState({ email: e });
    };
    handleInputVcode1 = e => {
        if (VCodeCheck(e)) { this.setState({ tvcode: true }) }
        else { this.setState({ tvcode: false }) }
        this.setState({ vcodeinput: e });
    };
    handleSendVCode1 = code => {
        var xhr = new XMLHttpRequest();
        if (EmailCheck(this.state.email)) {
            this.setState({ butenable: false });
            xhr.open('post', this.props.sendVCodeUrl, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("email=" + this.state.email);
        }
        else { alert("Please input correct email!"); }
        xhr.onload = function () {
            if (xhr.responseText == "True") {
                alert("Verification code sent successfully!");

            }
        };
        this.setState({ butenable: true });

    };
    handleSubmit1 = () => {
        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("name=" + this.state.name + "&phone=" + this.state.phone + "&email=" + this.state.email + "&vcode=" + this.state.vcodeinput);
        xhr.onload = function () {
            if (xhr.responseText == "True") { alert("Sbumit successfully!"); }
            else { { alert("Please input correct verification code!"); } }
        };
    };
    render() {
        return (
            <div >
                <FullName show={this.state.tname} handleFullName2={this.handleFullName1} />
                <Phone show={this.state.tphone} handlePhone2={this.handlePhone1} />
                <Email show={this.state.temail} handleEmail2={this.handleEmail1} />
                <VerificationCode show={this.state.tvcode} handleInputVcode2={this.handleInputVcode1} />
                <Buttons disabled={this.state.butenable ? "" : "disabled"} handleSendVCode2={this.handleSendVCode1} handleSubmit2={this.handleSubmit1} />

            </div>
        )
    }
}
const inputStyle_tick = {
    padding: "6 6",
    display: "block",
    backgroundImage: `url("./tick.png")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right"
};
const inputStyle_cross = {
    padding: "6 6",
    display: "block",
    backgroundImage: `url("./cross.png")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right"
};
const spanStyle_show = {
    color: "red",
    display: "block",
    visibility: "visible",
    marginBottom: 10,
    fontSize: 12
};
const spanStyle_hide = {
    color: "red",
    display: "block",
    visibility: "hidden",
    marginBottom: 10,
    fontSize: 12
};
class FullName extends React.Component {
    handleFullName3 = e => { this.props.handleFullName2(e.target.value); }
    render() {
        return (
            <div  >
                <input type="text" placeholder="Full name" style={this.props.show ? inputStyle_tick : inputStyle_cross} maxLength="25" onChange={this.handleFullName3} />
                <span style={this.props.show ? spanStyle_hide : spanStyle_show}>Please enter a name.</span>
            </div>
        );
    }
}
class Phone extends React.Component {
    handlePhone3 = e => { this.props.handlePhone2(e.target.value); }
    render() {
        return (
            <div>
                <input type="text" placeholder="Phone" style={this.props.show ? inputStyle_tick : inputStyle_cross} maxLength="14" onChange={this.handlePhone3} />
                <span style={this.props.show ? spanStyle_hide : spanStyle_show}>Please enter a phone.</span>
            </div>
        );
    }
}
class Email extends React.Component {
    handleEmail3 = e => { this.props.handleEmail2(e.target.value); }
    render() {
        return (
            <div>
                <input type="text" placeholder="Email" style={this.props.show ? inputStyle_tick : inputStyle_cross} maxLength="25" onChange={this.handleEmail3} />
                <span style={this.props.show ? spanStyle_hide : spanStyle_show}>Please enter an email.</span>
            </div>
        );
    }
}
class VerificationCode extends React.Component {
    handleInputVcode3 = e => { this.props.handleInputVcode2(e.target.value); }
    render() {
        return (
            <div>
                <input type="text" placeholder="Verification Code" style={this.props.show ? inputStyle_tick : inputStyle_cross} maxLength="4" onChange={this.handleInputVcode3} />
                <span style={this.props.show ? spanStyle_hide : spanStyle_show}>Please enter 4 digital verification code.</span>
            </div >
        );
    }
}
class Buttons extends React.Component {
    handleSendVCode3 = e => {
        e.preventDefault();
        this.props.handleSendVCode2();
    };
    handleSubmit3 = () => { this.props.handleSubmit2(); }
    render() {
        return (
            <div >
                <button style={{ padding: "10 6" }} onClick={this.handleSendVCode3} disabled={this.props.disabled} >Send Verification Code</button>
                <button style={{ padding: "10 6" }} onClick={this.handleSubmit3}>Submit</button>
            </div>
        );
    }
}
//ensure the email is correct.
function EmailCheck(email) {
    var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    if (!reg.test(email)) { return false; }
    else { return true; }
}
function PhoneCheck(phone) {
    var reg = /^\d{9,}$/;
    if (!reg.test(phone)) { return false; }
    else { return true; }
}
function VCodeCheck(VCode) {
    var reg = /^\d{4,}$/;
    if (!reg.test(VCode)) { return false; }
    else { return true; }
}