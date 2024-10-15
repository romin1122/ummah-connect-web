import './rightBar.scss';

function RightBar() {
  return (
    <div className='rightBar'>
      <div className='container'>
        <div className='item'>
          <span>Suggestions for you</span>
          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <span>Jane Doe</span>
            </div>
            <div className='buttons'>
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>

          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <span>Jane Doe</span>
            </div>
            <div className='buttons'>
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>

        <div className='item'>
          <span>Latest Activities</span>

          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>

        <div className='item'>
          <span>Online Friends</span>

          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className='user'>
            <div className='userInfo'>
              <img src='/static/owls.jpg' alt='' />
              <div className='online' />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
