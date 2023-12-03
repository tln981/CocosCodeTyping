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
    },

    onLoad () {
        //this.userNameEditBox.node.on('username-changed', this.onUsernameEntered, this);
        this._indexAtlas=0;
    },

    onUsernameEditBoxChange() {
        this._userName=this.userNameEditBox.getComponent(cc.EditBox).string;
    },
    changeAvatar(){
        this._indexAtlas=(this._indexAtlas+1)%this.atlasAvatar.getSpriteFrames().length;
        this.avatarImageNode.node.getChildByName('AvatarSprite').getComponent(cc.Sprite).spriteFrame=this.atlasAvatar.getSpriteFrames()[this._indexAtlas];
        this._spriteFrameAvatar=this.atlasAvatar.getSpriteFrames()[this._indexAtlas];
    },
    starGame(){
        this.userNameEditBox.node.active=false;
        this.avatarImageNode.node.active=false;
        this.buttonStart.node.active=false;
    },
   
    start () {
        //cc.log(this.avatarImageNode.node.getChildByName('AvatarSprite').getComponent(cc.Sprite).spriteFrame)
    },
    
    update (dt) {     
    },
});
