// Best Practice 

// create the namespace
var briteTest = briteTest || {};

// enclose all the component code in a immediate JS function (and make it $ safe by passing the jQuery as param)

(function($){
	
	// --------- Brite UI Component Interface Implementation ---------- //
	function DialogPrompt(){};
	
	DialogPrompt.prototype.create = function(data,config){
        var html = $("#tmpl-DialogPrompt").render(data);
        var $e = $(html);
        return $e;		
	}
	
	DialogPrompt.prototype.postDisplay = function(data,config){
		//always reassign the component "this" to "c" to avoid closure scope confusion
        var c = this;
        
        // Note: after the create, brite will add the created HTML Element as a jquery Element property to the component instance named $element
        
        c.$element.find("button.ok").click(function(){
            c.setAnswer(true);
        });
        
        c.$element.find("button.cancel").click(function(){
            c.setAnswer(false);
        });		
	}
	
	// --------- /Brite UI Component Interface Implementation ---------- //
	
    // --------- Custom DialogPrompt Public Methods --------- //
    
    // Note: this can be any API the developers was to expose
    
    // this is called by the caller to register a callBack on the "answerEvent"
    DialogPrompt.prototype.onAnswer = function(answerCallBack){
        this._answerCallBack = answerCallBack;
    },
    
    // this will be called by this component (from the postDisplay logic) when the user answer the prompt dialog
    DialogPrompt.prototype.setAnswer = function(answer){
        this.answer = answer;
        if (this._answerCallBack) {
            this._answerCallBack(answer);
        }
        this.close();
    },
    
    // this will be call by this component when the user close the dialog by answering or pressing esc
    DialogPrompt.prototype.close = function(){
        this.$element.bRemove();
    }
    // --------- /Custom DialogPrompt Public Methods --------- //			
	
	
	// add the DialogPrompt component definition to the briteTest namespace
	briteTest.DialogPrompt = DialogPrompt;
	
	
})(jQuery);

