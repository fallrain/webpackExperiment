import React from 'react';
import ReactCoreImageUpload from 'react-core-image-upload';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: {},
      imgSrc: ''
    };
    this.imageUploaded = this.imageUploaded.bind(this);
    // this.imageChanged = this.imageChanged.bind(this);
  }

  imageUploaded=(data) => {
    console.log(data);
  }

  imageChanged = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      this.setState({
        imgSrc: data,
      });
      // 加载图片获取图片真实宽度和高度
      const image = new Image();
      image.onload = function () {
        const { width } = image;
        const { height } = image;
        alert(`${width}======${height}=====${file.size}`);
      };
      image.src = data;
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { state, imageUploaded, imageChanged } = this;
    return (
      <div>
        <img src={state.imgSrc} />
        {/* <ReactCoreImageUpload
          text="上传"
          inputOfFile="files"
          url="./api/upload.php"
          imageUploaded={imageUploaded}
          headers={state.headers}
          compress={90}
          isXhr
          imageuploading={imageChanged}
        /> */}
        <a href="">这是table</a>
        <table>
          <thead>
            <tr>
              <th>姓名</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>wang</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
