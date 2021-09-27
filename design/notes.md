** Method Names

For event handlers onXxxx() format. 

In a language liek c++ a base class might have several
handlers that derived classed could overide. 

This tend to workd well for major behaviours like drawing, but is a bit less so for things more common ly considered 
Events 

Events, Methods, Messages Close cousines. Each with differnt approaches to instance specialization.

Well to look at the nature of JavaScript. Methods can be dynamically added, so thathis te approach
thay might fit well. 

The base class might take care of event routing and bubbling, then it call defined methoinds onitselfm but only if that
instance has that method/handler


t = new Turtle()

// This is how the handler is added
t.onKey = (event) => {

}

for simple adhock programming, common for learning, this is clean and quick.

It also allows behavious to change dynamically based on system state. For example 
edit/run/dubug.

or 

// this is a bit more traditional, (not ES6)
t.onKey = function (event) {

}

For cases wher the base class has internal methonds not intended to be assinged like this
I'm experimenting wiht under score prefix.  "_onMouseDown" these are useful for raw handers hooked to
the DOM
