var randomParagraph = require('random-paragraph');
cc.Class({
    extends: cc.Component,
    properties: {
        _userName:"",
        userNameEditBox:cc.EditBox,
        _avatar:"",
        avatarImageNode:cc.Button,
        buttonStart:cc.Button,
        atlasAvatar:cc.SpriteAtlas,
        _indexAtlas:0,
        _spriteFrameAvatar:cc.SpriteFrame,
        layoutSignIn:cc.Layout,
        layoutGame:cc.Layout,
        layoutResult:cc.Layout,
        _timePlay:60,
        _timer:0,
        _isDrawClock:false,
        hoverClock:cc.Sprite,
        _context:String,
        _stringResults:[String],
        _stringTypings:[String],
        editBox:cc.EditBox,
        avatars:cc.Node,
    },
    onLoad () {
        this._timePlay=60;
        this._indexAtlas=0;
        this.layoutSignIn.node.active=true;
        this.layoutGame.node.active=false;
        this.layoutResult.node.active=false;
        this.avatars.active=false;
        this._isDrawClock=false;
        this._spriteFrameAvatar=this.atlasAvatar.getSpriteFrames()[this._indexAtlas];
    },
    onUsernameEditBoxChange() {
        this._userName=this.userNameEditBox.getComponent(cc.EditBox).string;
        this._spriteFrameAvatar=this.atlasAvatar.getSpriteFrames()[this._indexAtlas];
    },
    nextAvatar(){
        this._indexAtlas=(this._indexAtlas+1)%this.atlasAvatar.getSpriteFrames().length;
        this.avatarImageNode.node.getChildByName('AvatarSprite').getComponent(cc.Sprite).spriteFrame=this.atlasAvatar.getSpriteFrames()[this._indexAtlas];
        this._spriteFrameAvatar=this.atlasAvatar.getSpriteFrames()[this._indexAtlas];
    },
    previousAvatar(){
        this._indexAtlas=(this._indexAtlas-1)%this.atlasAvatar.getSpriteFrames().length;
        if(this._indexAtlas<0)this._indexAtlas=this.atlasAvatar.getSpriteFrames().length-1;
        this.avatarImageNode.node.getChildByName('AvatarSprite').getComponent(cc.Sprite).spriteFrame=this.atlasAvatar.getSpriteFrames()[this._indexAtlas];
        this._spriteFrameAvatar=this.atlasAvatar.getSpriteFrames()[this._indexAtlas];
    },
    chooseAvatar(targetButton){
        this._spriteFrameAvatar=targetButton.currentTarget.getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame;
        this.avatarImageNode.node.getChildByName('AvatarSprite').getComponent(cc.Sprite).spriteFrame=targetButton.currentTarget.getChildByName("Avatar").getComponent(cc.Sprite).spriteFrame;
        this.toggleAvatars();
    },
    toggleAvatars(){
        this.avatars.active= !(this.avatars.active);
    },
    starGame(){
        this.layoutSignIn.node.active=false;
        this.layoutGame.node.active=true;
        this.layoutGame.node.getChildByName('UserName').getComponent(cc.Label).string=this._userName;
        this.layoutGame.node.getChildByName('Avatar').getComponent(cc.Sprite).spriteFrame=this._spriteFrameAvatar;
        this._isDrawClock=true;
        this.newParagraph();
        this.editBox.focus();
    },
    drawClock(percentFill){
        this.hoverClock.fillRange=percentFill;
        if(percentFill<0.6){
            const red=percentFill*255*100/60;
            this.hoverClock.node.color=cc.color(red,255,0);
        }else if(percentFill<0.9){
            const green=255-((percentFill-0.6)*255*100/30);
            this.hoverClock.node.color=cc.color(255,green,0);
        }
    },
    newParagraph(){
        this._context=randomParagraph({ sentences:1 });
        this._context.split(' ').forEach(word => {
            this._stringResults.push(word);
        });
        this.layoutGame.node.getChildByName('Text').getComponent(cc.Label).string=this._context;
    },
    textChange(){
        if (this.editBox.string[this.editBox.string.length-1]==' '){
            this._stringTypings.push(String(this.editBox.string).trim());
            if(this._stringResults.length==this._stringTypings.length){
                this.newParagraph();
            }
            this.editBox.string="";
            this.editBox.blur();
            this.editBox.focus();
        }
    },
    showResult(){
        this.layoutGame.node.active=false;
        this.layoutResult.node.active=true;
        let count=0;
        this._stringTypings.forEach((word,index)=>{
            if(word==this._stringResults[index])count++;
        });
        this.layoutResult.node.getChildByName('Avatar').getComponent(cc.Sprite).spriteFrame=this.atlasAvatar.getSpriteFrames()[this._indexAtlas];
        this.layoutResult.node.getChildByName('UserName').getComponent(cc.Label).string=this._userName;
        this.layoutResult.node.getChildByName('WPM').getComponent(cc.Label).string=count/(this._timePlay/60)+" WPM";
    },
    
    start () {   
    },

    update (dt) {    
        if(this._isDrawClock){
            this._timer+=dt;
            const percentFill=this._timer/this._timePlay;
            if(percentFill<1)this.drawClock(percentFill);
            else{
                this._isDrawClock=false;
                this.showResult();
            }
        }
    },

});
