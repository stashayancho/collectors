import urllib2
from bs4 import BeautifulSoup
import psycopg2

quote_page = 'http://hotwheels.wikia.com/wiki/List_of_1995_Hot_Wheels'
page = urllib2.urlopen(quote_page)
soup = BeautifulSoup(page, 'html.parser')

all_tables = soup.find_all('table', class_= 'wikitable')

car_data = []

for table in all_tables:
  for row in table.findAll('tr')[1:]:
    cells = row.findAll('td')
    if len(cells) > 4:
      photo = cells[-1].find('a')
      if photo != None:
        photo = photo.get('href')
      car_data.append((cells[0].text, cells[2].text, cells[3].text, photo))




def create_tables():
    """ create tables in the PostgreSQL database"""
    commands = (
        """
        CREATE TABLE cars (
            car_id SERIAL PRIMARY KEY,
            toy_number VARCHAR(255),
            model_name VARCHAR(255),
            series VARCHAR(255),
            car_photo VARCHAR(255)
        )
        """)
    conn = None
    try:
        conn = psycopg2.connect("dbname='collectors' user='postgres'")
        cur = conn.cursor()
        # for command in commands:
        cur.execute(commands)
        cur.close()
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# create_tables()


def seed_table():
    query = (
        """
        INSERT INTO cars
            (toy_number, model_name, series, car_photo)
            VALUES(%s, %s, %s, %s);
        """)
    conn = None
    try:
        conn = psycopg2.connect("dbname='collectors' user='postgres'")
        cur = conn.cursor()
        # create table one by one
        # for command in commands:
        cur.executemany(query, car_data)
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        raise(error)
    finally:
        if conn is not None:
            conn.close()


# seed_table()
print 'I ran'
