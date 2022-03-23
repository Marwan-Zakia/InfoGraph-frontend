export default function TestCard({img, name, text}) {
    return (
        <div className="testcard">
       
                <img src={img} alt="testimonial" />
     
       
                <h1>{name}</h1>
                <p>{text}</p>
 
        </div>
    );

}