import React from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import GithubLogo from './GitHub-Mark.png'

function Footer () {
    
    return (
      <div className='Footer'>
        <p className='FooterText'> Made by Nian Li 16/04/2021</p>
        <Button size='sm' className='button2'
          onClick={() => {
            window.open('https://github.com/Nianli321/my2048', '_blank');
          }}
          variant="primary"
        >
          <img  src={GithubLogo} style={{width: 20, margin: 5}} alt="fireSpot"/>
          source code
        </Button>
      </div>
    )
}

export default Footer;