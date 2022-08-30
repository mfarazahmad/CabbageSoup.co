import BaseForm from '../Widgets/Forms/BaseForm';
import BaseContactForm from '../Widgets/Forms/ContactForm/BaseContactForm';

const ContactPage = (props) => {

    return (
        <div className="page" id="contact">
            <section className="base padding">
                <div className="sectionTitle" data-aos="slide-down">Let's Talk<span className="dot">.</span></div>
                <BaseForm db_route={props.db_route}>
                    <BaseContactForm />
                </BaseForm> 
            </section>
        </div>
    );
}

export default ContactPage;