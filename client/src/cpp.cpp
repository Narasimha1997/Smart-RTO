#include<stdio.h>
#include<GL/glut.h>

float angle, move, scene, roadmove,turn, on=1;
int i, start;

void init(GLvoid)
{
   glClearColor(0, 0, 0, 0);           //set the Background Color BLACK
   glEnable(GL_DEPTH_TEST);
   glShadeModel(GL_SMOOTH);           // Enable Smooth Shading

  
}

void wall()
{
   glRectf(0, 0, 14, 10);
}

void Stars()
{
   glPointSize(2);
   glBegin(GL_POINTS);
   glVertex2f(0,0);
   glVertex2f(0,0.30);
   glVertex2f(0.1,0.45);
   glVertex2f(0,0.65);
   glVertex2f(0.1,0.85);
   glEnd();
}

void Moon()
{
   glutSolidSphere(.5, 10, 10);
}

void Tree(){
   glPushMatrix();
   glTranslatef(4.75,.25,3);
   //glRotatef(a, 0, 1, 0);
   glColor3f(0.133333, 0.545098 , 0.133333);
   glutSolidCone(1.5,2, 10, 2);
   glPopMatrix();

   glPushMatrix();
   glTranslatef(4.75,.25,3.9);
   //glRotatef(a, 0, 1, 0);
   glColor3f(0.133333, 0.545098 , 0.133333);
   glutSolidCone(1.5,2, 10, 2);
   glPopMatrix();

   glPushMatrix();
   glTranslatef(4.75,.25,4.75);
   //glRotatef(a, 0, 1, 0);
   glColor3f(0.133333, 0.545098 , 0.133333);
   glutSolidCone(1.5,2, 10, 2);
   glPopMatrix();

   glPushMatrix();
   glTranslatef(5,-0.6,0);
   glRotatef(90, 1, 0, 0);
   glColor3f(0.823529,0.411765,0.117647);
   glRectf(0, 0, -.5, 3);
   glPopMatrix();
   glEnd();
}

void groundroad()                   //GroundRoad
{
   glColor3f(0, 1, 0);
   glPushMatrix();
   glScalef(1, 50, 0);
   wall();                           //Green BackGround
   //glPopMatrix();

   glColor3f(0, 1, 0);
   //glPushMatrix();
   glScalef(1.1, 10, 0);
   wall();                           //Green BackGround
   glPopMatrix();

  
   glPushMatrix();
   glColor3f(0, 1, 0);
   glScalef(-1, 50, 0);
   wall();                           //Green BackGround
   glPopMatrix();


   glTranslatef(5, 0, .01);

   glPushMatrix();
   glScalef(.25, 50, 1);
   glColor3f(0.411765,0.411765,0.411765);
   wall();                           //Black Road
   glPopMatrix();

  
   glPushMatrix();
   glTranslatef(1.5, -1.3, .01);
   glColor3f(1, 1, 1);
   for (i = 0; i < 250; i++)
   {
       glTranslatef(0, 2, 0);
       glRectf(0, 0, .5, 1);       //White Bricks on Road
   }

   glPopMatrix();

   glPushMatrix();
   glTranslatef(3.5, -1.3, .01);
   glColor3f(1, 0.54902, 0);
   for (i = 0; i < 500; i++)
   {
       glTranslatef(0, 1, 0);
       glRectf(0, 0, .5, 1);       //Yellow line on Road
   }

   glPopMatrix();

       glPushMatrix();
   glTranslatef(-.5, -1.3, .01);
   glColor3f(1, 0.54902, 0);
   for (i = 0; i < 500; i++)
   {
       glTranslatef(0, 1, 0);
       glRectf(0, 0, .5, 1);       //Yellow line on Road
   }

   glPopMatrix();

   glPushMatrix();
   glTranslatef(4, 1.3, -1);
   glColor3f(1, 0.54902, 0);
   for (i = 0; i < 30; i++)
   {
       glTranslatef(0, 10, 0);
       Tree();      
   }

   glPopMatrix();

   glPushMatrix();
   glTranslatef(9, 1.3, -1);
   glColor3f(0.721569, 0.52549, 0.0431373);
   glRectf(0,0,22,600);
   glPopMatrix();

   glPushMatrix();
   glTranslatef(15, -1.3, .01);
   glColor3f(1, 0.54902, 0);
   for (i = 0; i < 500; i++)
   {
       glTranslatef(0, 1, 0);
       glRectf(0, 0, .5, 1);       //track 1
   }

   glPopMatrix();

   glPushMatrix();
   glTranslatef(21, -1.3, .01);
   glColor3f(1, 0.54902, 0);
   for (i = 0; i < 500; i++)
   {
       glTranslatef(0, 1, 0);
       glRectf(0, 0, .5, 1);       //track
   }

   glPopMatrix();

   glPushMatrix();
   glTranslatef(19, 20, 2.5);
   glColor3f(0, 0, 1);
glScalef(3, 8, 2.5);
   glutSolidCube(2);
   glPopMatrix();
   }

void House()
{
   glPushMatrix();
   glTranslatef(-16,2,2);
   glColor3f(0.721569,0.52549,0.0431373);
   glutSolidCube(4);

   glPushMatrix();
   glTranslatef(-27.5,3,1.5);
   glRotatef(90, 0, 1, 0);
   glColor3f(1, 1, 1);
   glRectf(0, 0, .5, 1);
   glPopMatrix();
  
   glPushMatrix();
   glTranslatef(-27.5,1,1.5);
   glRotatef(90, 0, 1, 0);
   glColor3f(1, 1, 1);
   glRectf(0, 0, .5, 1);
   glPopMatrix();

   glPushMatrix();
   glTranslatef(-27.5,-1,1.5);
   glRotatef(90, 0, 1, 0);
   glColor3f(1, 1, 1);
   glRectf(0, 0, .5, 1);
   glPopMatrix();


   glPushMatrix();
   glTranslatef(-27.5,3,-.5);
   glRotatef(90, 0, 1, 0);
   glColor3f(1, 1, 1);
   glRectf(0, 0, .5, 1);
   glPopMatrix();

   glPushMatrix();
   glTranslatef(-27.5,1,-.5);
   glRotatef(90, 0, 1, 0);
   glColor3f(1, 1, 1);
   glRectf(0, 0, .5, 1);
   glPopMatrix();

   glPushMatrix();
   glTranslatef(-27.5,-1,-.5);
   glRotatef(90, 0, 1, 0);
   glColor3f(1, 1, 1);
   glRectf(0, 0, .5, 1);
   glPopMatrix();

   glPopMatrix();

   glPushMatrix();
   glTranslatef(-16,5,2);
   glColor3f(0.721569,0.52549,0.0431373);
   glutSolidCube(4);
   glPopMatrix();

   }


void truck()
{
   glColor3f(0,0.545098,0.545098 );
   glScalef(1, 1, 2);
   glutSolidCube(1);

   glTranslatef(0, -.25, .5);
   glColor3f(0.862745, 0.862745, 0.862745);
   glutSolidCube(.5);

   }

void train()
{
   glPushMatrix();
   glTranslatef(19, 20, 2.5);
   glColor3f(0, 0, 1);
glScalef(3, 8, 2.5);
   glutSolidCube(2);
   glPopMatrix();

   }
void display(void)
{
   glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
   glLoadIdentity();

  

   glPushMatrix();

   glTranslatef(-4,0.8,-2);
   glColor3f(1,1,1);
   Stars();
  

   for (int i =0;i<20;i++){
       glTranslatef(0.4,0,0);
       Stars();
   }
   glPushMatrix();
   glTranslatef(-9,3,-4);
   glColor3f(1,1,1);
   Moon();
   glTranslatef(.2,0,0);
   glColor3f(0,0,0);
   Moon();
   glPopMatrix();

   glPopMatrix();
  
   glTranslatef(-7, -5, -6);
   glTranslatef(0, 0, roadmove); //Road Movement
   //glLightfv(GL_LIGHT0, GL_POSITION, position);
   glRotatef(scene, 0, 1, 0); //Scene Rotation
   glPushMatrix();
   glRotatef(-90, 1, 0, 0);
   groundroad();       //Ground & Road
   glPopMatrix();

   glPushMatrix();
   glRotatef(90, 0, 1, 0);
   for (int k = 0; k < 20; k++)
   {

       glTranslatef(25,0 , 0);


       House(); //house
   }
   glPopMatrix();

   glTranslatef(6, 1, 0);
   glTranslatef(turn, 0, move);
   glTranslatef(0, 0, on);
   glRotatef(-180, 1, 0, 0);
   truck();//truck
  
   //train();

   if (start==-1) //control from keyboard
   {
      
       if (roadmove < 550)
       {
           roadmove = roadmove + .05; //Ground & Road Movement

           on = on - .055; // Truck Movement
           glutPostRedisplay();
       }
       else
       {
          
           }
                  
       }
  
      
  
      
   glutSwapBuffers();

}

void SpecialInput(int key, int x, int y)
{
   switch (key)
   {
   case GLUT_KEY_UP: //Truck Forward

      
           move = move - .05;
          
               break;
      

   case GLUT_KEY_DOWN: //Truck Reverse
      
      
           move += .3;
      
       break;

   case GLUT_KEY_LEFT: //Truck Left Turn
      
          
                   turn = turn - .05;
              
               break;
      

   case GLUT_KEY_RIGHT: //Truck Righ Turn
       turn = turn + .05;
       break;

   }
   glutPostRedisplay();
}
void keyboard(unsigned char key, int x, int y)
{
   switch (key)
   {
   case 27://ESC
       exit(0);
      
       break;
  
   case 'r': //reset all scene
       angle = 0;
       move = 0;
       scene = 0;
       roadmove = 0;
       on = 0;
       turn = 0;
       break;
  
   case '4': //scene rotation
       scene = scene + .5;
       break;

   case '6': //scene rotation
       scene = scene - .5;
       break;

   case 'w': //strat scene
       start = -1;
       break;
  
   }
   glutPostRedisplay();
}

void reshape(int w, int h) // Create The Reshape Function (the viewport)
{
   glViewport(0, 0, w, h);
   glMatrixMode(GL_PROJECTION); // Select The Projection Matrix
   glLoadIdentity(); // Reset The Projection Matrix
   if (h == 0) // Calculate The Aspect Ratio Of The Window
       gluPerspective(80, (float)w, 1.0, 5000.0);
   else
       gluPerspective(80, (float)w / (float)h, 1.0, 5000.0);
   glMatrixMode(GL_MODELVIEW); // Select The Model View Matrix
   glLoadIdentity(); // Reset The Model View Matrix
}

int main(int a, char** b)
{
   glutInit(&a, b);
   glutInitDisplayMode(GLUT_DOUBLE | GLUT_DEPTH |GLUT_RGB);
   glutInitWindowSize(600,500);           //Size of the Window
   glutInitWindowPosition(80, 80);       //Position of the Windows  
   glutCreateWindow("SEMESTER PROJECT");           //Title of the Window
   init();
   glutDisplayFunc(display);               //Callback Function
   glutReshapeFunc(reshape);               //Callback Function
   glutKeyboardFunc(keyboard);
   glutSpecialFunc(SpecialInput);
   glutMainLoop();                           //Mainloop
   return 0;
}